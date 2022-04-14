import { Appointment } from 'src/appointment/appointment.entity';
import { Controller } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { Crud, CrudController } from '@nestjsx/crud';
import { ApiTags } from '@nestjs/swagger';

@Crud({
  model: {
    type: Appointment,
  },
  params: {
    patientId: {
      field: 'patientId',
      type: 'number',
    },
    id: {
      field: 'id',
      type: 'number',
      primary: true,
    },
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
@ApiTags('appointment')
@Controller('/patient/:patientId/appointment')
export class AppointmentController implements CrudController<Appointment> {
  constructor(public service: AppointmentService) {}
}
