import type { NextApiRequest, NextApiResponse } from 'next';

import admin from 'firebase-admin';
import firebaseConfig from '../../../firebase-config.json';

admin.initializeApp(firebaseConfig);


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const auth = admin.auth();
  const email = req.body.email;
  const curUser = await auth.getUserByEmail(email);
  console.log(curUser);
  const uid = curUser.uid;
  console.log(auth.deleteUser(uid));

  res.status(200).json({ name: 'John Doe' });
}