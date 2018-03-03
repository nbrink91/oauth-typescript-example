import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm';

@Entity()
@Index(['client_token', 'refresh_token'])
export class Token {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar")
    client_token: string;

    @Column("varchar")
    refresh_token: string;
}
