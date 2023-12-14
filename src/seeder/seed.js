//const bcrypt = require("bcrypt");
const { sequelize } = require("../config/db.config");
const { User, Account, Card, Transaction } = require("../models/index.models");
const bcrypt = require("bcrypt");

const seedSQLite = async () => {
  try {

    // Connect to the SQLite database
    await sequelize.authenticate();
    console.log("Connected to the SQLite database");

    // Synchronize models with the database (force: true to recreate tables)
    await sequelize.sync({ force: true });
    console.log("Models synchronized with the SQLite database");

    // Create users
    const user1 = await User.create({
      nombre: "John",
      apellido: "Doe",
      email: "john.doe@example.com",
      dni: 123456789,
      password: await bcrypt.hash("Pass123", 10),
    });

    const user2 = await User.create({
      nombre: "Jane",
      apellido: "Doe",
      email: "jane.doe@example.com",
      dni: 987654321,
      password: await bcrypt.hash("Pass123", 10),
    });

    // Create accounts
    const account1 = await Account.create({
      moneda: "usd",
      tipo: "ahorro",
      balance: 1000.0,
      activa: true,
      UserId: user1.id,
    });

    const account2 = await Account.create({
      moneda: "ars",
      tipo: "corriente",
      balance: 2000.0,
      activa: true,
      UserId: user2.id,
    });

    // Create cards
    const card1 = await Card.create({
      numero: 12345,
      cvv: 456,
      tipo: "debito",
      estado: "activa",
      expiracion: 12,
      limite: 500.0,
      AccountId: account1.id,
    });

    const card2 = await Card.create({
      numero: 56789,
      cvv: 789,
      tipo: "credito",
      estado: "activa",
      expiracion: 10,
      limite: 1000.0,
      AccountId: account2.id,
    });

    // Create transactions
    const transaction1 = await Transaction.create({
      cantidad: 200.0,
      CardNumero: card1.numero,
      AccountId: account1.id,
    });
    // account1.balance += transaction1.cantidad;
    // await account1.save();
    await account1.increment('balance', { by: transaction1.cantidad });

    const transaction2 = await Transaction.create({
      cantidad: 300.0,
      CardNumero: card2.numero,
      AccountId: account2.id,
    });
    // account2.balance += transaction2.cantidad;
    // await account2.save();
    await account2.increment('balance', { by: transaction2.cantidad });


    console.log("SQLite database seeded successfully!");
  } catch (error) {
    console.error("Error seeding SQLite database:", error);
  }finally {
    // Close the database connection
    await sequelize.close();
    console.log("Closed the SQLite database connection");
  }
};

seedSQLite();


// Correr
//npm run seed
