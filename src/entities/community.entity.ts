import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from './base-entity';
import { Post } from './post.entity';

@Entity('communitys')
export class Community extends BaseEntity {
  @Column({ type: 'varchar', length: 100, nullable: false })
  name: string;

  @OneToMany(() => Post, (post) => post.community)
  post: Post[];
}
