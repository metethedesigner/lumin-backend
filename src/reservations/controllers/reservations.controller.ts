import { Controller, Get, Query, UseGuards, Req, InternalServerErrorException } from '@nestjs/common';
import { ReservationsService } from '../services/reservations.service';
import { Request } from 'express';
import { User } from 'src/users/interfaces/user.interface';
import { AuthGuard } from '@nestjs/passport';
import { GetReservationsDto } from '../dtos/reservations.dto';

@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async getReservations(
    @Req() request: Request,
    @Query() query: GetReservationsDto
  ) {
    try {
      const user = request.user as User;
      if (!user) {
        throw new InternalServerErrorException('User not found');
      }

      const { page, limit, startDate, endDate } = query;
      const result = await this.reservationsService.getFilteredReservations(
        user,
        page,
        limit,
        startDate ? new Date(startDate) : undefined,
        endDate ? new Date(endDate) : undefined
      );

      // Kullanıcı admin olarak giriş yapmadıysa passangers bilgisini hiç göndermiyorum.
      if (user.role !== 'admin') {
        result.data = result.data.map((reservation) => {
          const { passengers, ...rest } = reservation;
          return rest;
        });
      }

      return result;
    } catch (error) {
      console.error('Error fetching reservations:', error);
      throw new InternalServerErrorException('Could not fetch reservations');
    }
  }
}
