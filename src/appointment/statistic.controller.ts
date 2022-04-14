import { Appointment } from 'src/appointment/appointment.entity';
import { Controller, UseInterceptors } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import {
  Crud,
  CrudController,
  CrudRequest,
  CrudRequestInterceptor,
  ParsedRequest,
} from '@nestjsx/crud';
import { ApiTags } from '@nestjs/swagger';
import { Get } from '@nestjs/common';

@Crud({
  model: {
    type: Appointment,
  },
  routes: {
    only: ['getManyBase'],
  },
  query: {
    sort: [
      {
        field: 'createAt',
        order: 'ASC',
      },
    ],
  },
})
@ApiTags('Appointment statistic')
@Controller('/appointment/statistic')
export class AppointmentStatisticController
  implements CrudController<Appointment>
{
  constructor(public service: AppointmentService) {}

  get base(): CrudController<Appointment> {
    return this;
  }

  @UseInterceptors(CrudRequestInterceptor)
  @Get('/balance/')
  async balance(@ParsedRequest() req: CrudRequest) {
    const balance = (await this.base.getManyBase(req)) as Appointment[];
    const result = balance.reduce(
      (accumulator, balance) => accumulator + Number(balance.amount),
      0,
    );
    return result;
  }
}
