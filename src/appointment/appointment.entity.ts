import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import {
  IsOptional,
  IsString,
  IsNotEmpty,
  IsDateString,
  IsEnum,
  IsBoolean,
  IsNumber,
  Min,
} from 'class-validator';
import { CrudValidationGroups } from '@nestjsx/crud';
import { ApiProperty } from '@nestjs/swagger';
import { Patient } from 'src/patient/patient.entity';

const { CREATE, UPDATE } = CrudValidationGroups;

export enum Currency {
  USD = 'usd',
  EUR = 'eur',
  BITCOIN = 'bitcoin',
}

@Entity('appointment')
export class Appointment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @IsOptional({ groups: [UPDATE] })
  @IsNotEmpty({ groups: [CREATE] })
  @IsDateString({ always: true })
  @Column()
  start: Date;

  @ApiProperty()
  @IsOptional({ groups: [UPDATE] })
  @IsNotEmpty({ groups: [CREATE] })
  @IsDateString({ always: true })
  @Column()
  end: Date;

  @ApiProperty()
  @IsOptional()
  @IsString({ always: true })
  @Column('varchar')
  description: string;

  @ApiProperty()
  @IsOptional({ groups: [UPDATE] })
  @IsNotEmpty({ groups: [CREATE] })
  @IsBoolean()
  @Column({ type: 'boolean', nullable: false })
  paid: boolean;

  @ApiProperty()
  @IsOptional({ groups: [UPDATE] })
  @IsNotEmpty({ groups: [CREATE] })
  @IsEnum(Currency)
  @Column({ type: 'enum', enum: Currency })
  currency: Currency;

  @ApiProperty()
  @IsOptional({ groups: [UPDATE] })
  @IsNotEmpty({ groups: [CREATE] })
  @IsNumber()
  @Min(0)
  @Column({ type: 'decimal', default: 0 })
  amount: number;

  @ManyToOne(() => Patient, (Patient) => Patient.appointment)
  patient: Patient;

  @Column({ nullable: false })
  patientId?: number;

  @CreateDateColumn()
  createAt: Date;
}
