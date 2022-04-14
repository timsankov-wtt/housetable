import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointmentController } from './appointment.controller';
import { Appointment } from './appointment.entity';
import { AppointmentService } from './appointment.service';
import { AppointmentStatisticController } from './statistic.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Appointment])],
  providers: [AppointmentService],
  exports: [AppointmentService],
  controllers: [AppointmentController, AppointmentStatisticController],
})
export class AppointmentModule {}
