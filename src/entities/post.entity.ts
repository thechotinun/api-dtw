import { Column, Entity, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { BaseEntity } from './base-entity';
import { Community } from './community.entity';
import { Comment } from './comment.entity';
import { User } from './user.entity';

@Entity('posts')
export class Post extends BaseEntity {
  @Column({ type: 'varchar', length: 100, nullable: false })
  title: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  description: string;

  @Column({ name: 'communityId', type: 'int' })
  @ManyToOne(() => Community)
  @JoinColumn({ name: 'communityId' })
  community: number;

  @OneToMany(() => Comment, (comment) => comment.post)
  comment: Comment[];

  @Column({ name: 'userId', type: 'int' })
  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: number;
}
