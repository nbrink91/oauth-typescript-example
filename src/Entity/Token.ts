import { Column, Entity, Index, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import Client from './Client';

@Entity()
@Index(['accessToken', 'refreshToken'])
export default class Token {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => Client, {
        nullable: false
    })
    @JoinColumn({
        name: 'client_id'
    })
    client: Client;

    @Column({
        type: 'varchar',
        name: 'access_token'
    })
    accessToken: string;

    @Column({
        type: 'timestamp',
        default: new Date()
    })
    created: Date;

    @Column({
        type: 'timestamp'
    })
    expiration: Date;

    @Column({
        type: 'varchar',
        name: 'refresh_token'
    })
    refreshToken: string;
}
