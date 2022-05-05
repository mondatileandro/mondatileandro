import { NextApiRequest, NextApiResponse } from 'next';
import { withValidation } from 'next-validations';
import { profileImagesUpload } from 'lib-server/middleware/upload';
import { apiHandler } from 'lib-server/nc';
import { requireAdmin, requireAuth } from 'lib-server/middleware/auth';
import ApiError from 'lib-server/error';
import {
  userIdCuidSchema,
  userUpdateSchema,
  validateUserIdCuid,
} from 'lib-server/validation';
import { ClientUser, UserUpdateServiceData } from 'types/models/User';
import { deleteUser, getMe, getUser, updateUser } from 'lib-server/services/users';

type MulterRequest = NextApiRequest & { files: any };

const handler = apiHandler();

const validateUserUpdate = withValidation({
  schema: userUpdateSchema,
  type: 'Zod',
  mode: 'body',
});

const validateUserCuid = withValidation({
  schema: userIdCuidSchema,
  type: 'Zod',
  mode: 'query',
});

// GET /api/users/:id
// only for me query
handler.get(
  validateUserCuid(),
  async (req: NextApiRequest, res: NextApiResponse<ClientUser>) => {
    const id = validateUserIdCuid(req.query.id as string);
    const user = await getUser(id);

    if (!user) throw new ApiError('User not found.', 404);
    res.status(200).json(user);
  }
);

handler.patch(
  requireAuth,
  profileImagesUpload,
  validateUserCuid(),
  validateUserUpdate(),
  async (req: NextApiRequest, res: NextApiResponse<ClientUser>) => {
    const id = validateUserIdCuid(req.query.id as string);

    const { body, files } = req as MulterRequest;
    const { name, username, bio, password } = body;
    const updateData = {
      name,
      username,
      bio,
      password,
      files,
    } as UserUpdateServiceData;

    const me = (await getMe({ req })) as ClientUser;

    const user = await updateUser(id, me, updateData);
    res.status(200).json(user);
  }
);

export const config = {
  api: {
    bodyParser: false,
  },
};

handler.delete(
  requireAdmin,
  validateUserCuid(),
  async (req: NextApiRequest, res: NextApiResponse<ClientUser>) => {
    const id = validateUserIdCuid(req.query.id as string);

    const user = await deleteUser(id);
    res.status(204).json(user);
  }
);

export default handler;
