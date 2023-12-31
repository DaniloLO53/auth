import * as service from '../src/authentication/auth/services';
import * as controller from '../src/authentication/auth/controllers';
import { describe, test, jest, afterAll, expect } from '@jest/globals';
import { NextFunction, Request, Response } from 'express';

describe('#Authentication', () => {
  jest.mock('../src/authentication/auth/services', () => ({
    create: jest.fn()
  }));

  afterAll(() => {
    jest.clearAllMocks();
  });

  describe('##Controllers', () => {
    test('signup should', async () => {
      jest.spyOn(service, service.create.name as never);

      const mockRequest = {
        body: {
          email: 'danilo@gmail.com',
          name: 'Danilo',
          password1: '123',
          password2: '123'
        }
      } as unknown as Request;
      const mockResponse = {} as unknown as Response;
      const mockNext = jest.fn() as NextFunction;

      await controller.signUp(mockRequest, mockResponse, mockNext);

      expect(service.create).toHaveBeenCalledTimes(1);
    })
  })
})