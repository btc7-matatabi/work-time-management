import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("m_accounts").del();

  // Inserts seed entries
  await knex("m_accounts").insert([
    {
      employee_code: "0000013",
      password: "$2b$10$xFF8ma3uPCR8Gjga5SJLd.qyyv9X0gj3qT2n4f0GQBxi6UIYKz6P6",
    },
  ]);
};
