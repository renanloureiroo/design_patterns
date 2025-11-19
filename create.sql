drop schema renan cascade;

create schema renan;

create extension if not exists "uuid-ossp";

create table renan.contract (
  id_contract uuid not null default uuid_generate_v4() primary key,
  description text,
  amount numeric,
  periods integer,
  date timestamp
);

create table renan.payment (
   id_payment uuid not null default uuid_generate_v4() primary key,
   id_contract uuid not null references renan.contract(id_contract),
   amount numeric,
   date timestamp
);

insert into renan.contract (id_contract, description, amount, periods, date) values (
  'ed6785a6-c24a-4307-bfa4-b5d7b718efef',
  'Prestação de serviços escolares',
  6000,
  12,
  '2025-01-01T00:00:00'
);

insert into renan.payment (id_payment, id_contract, amount, date) values (
  'c216824d-8ad7-420d-97be-7f61207154b7',
  'ed6785a6-c24a-4307-bfa4-b5d7b718efef',
  6000,
  '2025-01-05T10:00:00'
);