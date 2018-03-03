import { Entity, PrimaryGeneratedColumn, Column, Index, PrimaryColumn } from 'typeorm';

@Entity()
@Index(['client_id', 'client_secret'])
export class Client {
    @PrimaryColumn("varchar")
    client_id: string;

    @Column("varchar")
    client_secret: string;
}
