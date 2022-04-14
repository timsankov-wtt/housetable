import { Appointment } from 'src/appointment/appointment.entity';
import { Controller } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { Crud, CrudController } from '@nestjsx/crud';
import { ApiTags } from '@nestjs/swagger';

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
}
