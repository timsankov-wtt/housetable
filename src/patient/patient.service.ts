import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Patient } from './patient.entity';

@Injectable()
export class PatientService extends TypeOrmCrudService<Patient> {
  constructor(@InjectRepository(Patient) repo) {
    super(repo);
  }

  findMostPopularType() {
    return this.repo
      .createQueryBuilder('patients')
      .select('patients.type, COUNT(patients.type) as count')
      .groupBy('patients.type')
      .orderBy('count', 'DESC')
      .getRawOne();
  }

  countTypeAmount() {
    return this.repo
      .createQueryBuilder('patients')
      .select('patients.type, SUM(appointment.amount) as sum')
      .groupBy('patients.type')
      .leftJoin('patients.appointment', 'appointment')
      .orderBy('sum', 'DESC')
      .getRawMany();
  }
}
