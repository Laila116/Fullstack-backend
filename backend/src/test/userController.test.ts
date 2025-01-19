import { UserData } from '@shared/interface/iUser';
import { getUserGuthaben } from '../controller/cUser';
import Users from '../databaseSchema/postgresModels/mUser'; 
import { Request, Response, NextFunction } from 'express';

jest.mock('../databaseSchema/postgresModels/mUser', () => ({
    __esModule: true,
    default: {
    findOne: jest.fn(),
    create: jest.fn(),
  },
}));

describe('getUserGuthaben', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    req = {
      body: {},
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  it('should return balance if user is found', async () => {
    const mockUser:UserData = {
        email: 'user1@example.com',
        password: 'hashedpassword1',
        firstname: "Musa",
        surname: "Mustermann",
        phone: "+491701234567",
        birthday: new Date("1990-01-01"),
        companyName: "test4",
        balance: 40,
        role: "User"
    }
    const newUser = await Users.create(mockUser);
    
    (Users.findOne as jest.Mock).mockResolvedValue(mockUser);
    req.body = { email: 'test@example.com' };

    await getUserGuthaben(req as Request, res as Response, next);

    expect(Users.findOne).toHaveBeenCalledWith({ where: { email: 'test@example.com' } });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: 'Aktuelles Guthaben abgerufen', balance: mockUser.balance });
  });

  it('should call next with MissingFields if email is not provided', async () => {
    await getUserGuthaben(req as Request, res as Response, next);

    expect(next).toHaveBeenCalledWith(new Error('Fehlende Pflichtfelder.'));
    expect(Users.findOne).toHaveBeenCalled();
  });

  it('should call next with UserNotFound if user is not found', async () => {
    (Users.findOne as jest.Mock).mockResolvedValue(null);

    req.body = { email: 'notfound@example.com' };

    await getUserGuthaben(req as Request, res as Response, next);

    expect(Users.findOne).toHaveBeenCalledWith({ where: { email: 'notfound@example.com' } });
    expect(next).toHaveBeenCalledWith(new Error('Benutzer mit der angegebenen E-Mail-Adresse nicht gefunden.'));
  });

  it('should call next with InternalServerError if an error occurs', async () => {
    (Users.findOne as jest.Mock).mockRejectedValue(new Error('Database error'));

    req.body = { email: 'error@example.com' };

    await getUserGuthaben(req as Request, res as Response, next);

    expect(Users.findOne).toHaveBeenCalledWith({ where: { email: 'error@example.com' } });
    expect(next).toHaveBeenCalledWith(new Error('Ein unerwarteter Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.'));
  });
});
