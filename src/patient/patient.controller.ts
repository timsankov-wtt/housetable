import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';
import { PatientService } from './patient.service';
import { Patient } from './patient.entity';

@Crud({
  model: {
    type: Patient,
  },
  query: {
    join: {
      appointment: { eager: true },
    },
    sort: [
      {
        field: 'createAt',
        order: 'ASC',
      },
    ],
  },
})
@ApiTags('patient')
@Controller('patient')
export class PatientController implements CrudController<Patient> {
  constructor(public service: PatientService) {}
}
