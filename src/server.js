import express from 'express';
import dotenv from 'dotenv';
import pino from 'pino-http';
import cors from 'cors';
import env from './utils/env.js';
import { getAllContacts, getContactById } from './services/contacts.js';

dotenv.config();

// const app = express();

const PORT = Number(env('PORT', '3000'));

// export default function setupServer() {
//   app.use(cors());

//   app.use(
//     pino({
//       transport: {
//         target: 'pino-pretty',
//       },
//     }),
//   );

// app.use(express.json());

const setupServer = () => {
  const app = express();

  app.use(express.json());
  app.use(cors());

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.get('/contacts', async (req, res) => {
    try {
      const contacts = await getAllContacts();

      res.status(200).json({
        status: 'success',
        message: 'Successfully found contacts!',
        data: contacts,
      });
    } catch (err) {
      res.status(500).json({
        message: 'Something went wrong',
        error: err.message,
      });
    }
  });

  app.get('/contacts/:contactId', async (req, res) => {
    try {
      const { contactId } = req.params;
      const contact = await getContactById(contactId);

      if (!contact) {
        return res.status(404).json({
          message: 'Contact not found',
        });
      }

      res.status(200).json({
        status: 'success',
        message: `Successfully found contact with id ${contactId}!`,
        data: contact,
      });
    } catch (err) {
      res.status(500).json({
        message: 'Something went wrong',
        error: err.message,
      });
    }
  });

  app.use('*', (req, res) => {
    res.status(404).json({
      message: 'Not found',
    });
  });

  app.use((err, req, res) => {
    res.status(500).json({
      message: 'Something went wrong',
      error: err.message,
    });
  });

  app.listen(PORT, () => {
    console.info(`Server is running on port ${PORT}`);
  });
};

export default setupServer;

//   app.get('/contacts', async (_, res, next) => {
//     try {
//       const contacts = await getAllContacts();
//       res.status(200).json({
//         status: 200,
//         message: 'Successfully found contacts!',
//         data: contacts,
//       });
//     } catch {
//       next();
//     }
//   });

//   app.get('/contacts/:contactId', async (req, res, next) => {
//     try {
//       const { contactId } = req.params;

//       const contact = await getContactById(contactId);

//       if (!contact) {
//         res.status(404).json({
//           status: 404,
//           message: 'Contact not found',
//         });
//         return;
//       }

//       res.status(200).json({
//         status: 200,
//         message: `Successfully found contact with id ${contactId}!`,
//         data: contact,
//       });
//     } catch {
//       next();
//     }
//   });

//   app.use('*', (_, res) => {
//     res.status(404).json({
//       status: 404,
//       message: 'Not found',
//     });
//   });

//   app.use((err, _, res) => {
//     res.status(500).json({
//       status: 500,
//       message: 'Something went wrong',
//       error: err.message,
//     });
//   });

//   app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
//   });
// };
