const express = require('express');
const cors = require('cors');
const prisma = require('./prisma');

const app = express();
const port = 5100; // Using a different port from the original app

// Middleware
app.use(cors());
app.use(express.json());

// Routes

// Get all students
app.get('/students', async (req, res) => {
  try {
    // Using Prisma to fetch all students
    const students = await prisma.student.findMany();
    res.json(students);
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get a student by ID
app.get('/students/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid student ID' });
    }

    // Using Prisma to fetch a student by ID
    const student = await prisma.student.findUnique({
      where: { id },
    });

    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    res.json(student);
  } catch (error) {
    console.error('Error fetching student:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create a new student
app.post('/students', async (req, res) => {
  try {
    const { name, email, course, enrollment_date } = req.body;

    if (!name || !email || !course || !enrollment_date) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Using Prisma to create a new student
    const newStudent = await prisma.student.create({
      data: {
        name,
        email,
        course,
        enrollment_date: new Date(enrollment_date),
      },
    });

    res.status(201).json(newStudent);
  } catch (error) {
    console.error('Error creating student:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Gracefully shut down Prisma when the app terminates
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit();
});

// Start the server
app.listen(port, () => {
  console.log(`Prisma server running on http://localhost:${port}`);
});