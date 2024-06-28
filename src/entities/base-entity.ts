import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export class BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdDate: Date;

  @Column({ type: 'int' })
  createdBy?: number;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedDate: Date;

  @Column({ type: 'int' })
  updatedBy?: number;

  @Column({
    type: 'bool',
    default: true,
  })
  isActive?: boolean;

  @DeleteDateColumn({
    type: 'timestamp',
    nullable: true,
  })
  deletedDate?: Date;
}
