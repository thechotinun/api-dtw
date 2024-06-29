import { Column, Entity, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from './base-entity';
import { Post } from './post.entity';
import { User } from './user.entity';

@Entity('comments')
export class Comment extends BaseEntity {
  @Column({ type: 'varchar', length: 100, nullable: false })
  text: string;

  @Column({ name: 'postId', type: 'int' })
  @ManyToOne(() => Post)
  @JoinColumn({ name: 'postId' })
  post: number;

  @Column({ name: 'userId', type: 'int' })
  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: number;
}
