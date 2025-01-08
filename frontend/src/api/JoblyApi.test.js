import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import axios from 'axios';
import axiosMockAdapter from 'axios-mock-adapter';
import JoblyApi from './JoblyApi';  // Assuming this is the correct path

describe('JoblyApi', () => {
  let mock;

  // Setup: Create an Axios mock instance before each test
  beforeEach(() => {
    mock = new axiosMockAdapter(axios);
  });

  // Clean up after each test
  afterEach(() => {
    mock.restore();
  });

  it('should get company data', async () => {
    // Mock the API response
    const mockData = {
      company: {
        handle: 'company1',
        name: 'Company 1',
        description: 'A tech company.',
        numEmployees: 100,
        logoUrl: 'http://company1.logo',
      },
    };
    mock.onGet('http://localhost:3001/companies/company1').reply(200, mockData);

    // Make the API call
    const company = await JoblyApi.getCompany('company1');

    // Assertions: Verify the response
    expect(company.handle).toBe('company1');
    expect(company.name).toBe('Company 1');
    expect(company.description).toBe('A tech company.');
  });

  it('should handle error when company not found', async () => {
    // Mock the API error response
    mock.onGet('http://localhost:3001/companies/invalidcompany').reply(404, {
      error: { message: 'Company not found' },
    });

    // Assertions: Test the error handling
    try {
      await JoblyApi.getCompany('invalidcompany');
    } catch (error) {
      expect(error).toEqual(['Company not found']);
    }
  });

  it('should get all companies', async () => {
    // Mock the API response
    const mockCompanies = {
      companies: [
        {
          handle: 'company1',
          name: 'Company 1',
          description: 'A tech company.',
          numEmployees: 100,
          logoUrl: 'http://company1.logo',
        },
        {
          handle: 'company2',
          name: 'Company 2',
          description: 'A design company.',
          numEmployees: 50,
          logoUrl: 'http://company2.logo',
        },
      ],
    };
    mock.onGet('http://localhost:3001/companies').reply(200, mockCompanies);

    // Make the API call
    const companies = await JoblyApi.getCompanies();

    // Assertions: Verify the response
    expect(companies.length).toBe(2);
    expect(companies[0].name).toBe('Company 1');
    expect(companies[1].name).toBe('Company 2');
  });

  it('should apply to a job', async () => {
    // Mock the API response
    const mockResponse = { applied: 1 };
    mock.onPost('http://localhost:3001/users/testuser/jobs/1').reply(200, mockResponse);

    // Make the API call
    const response = await JoblyApi.applyToJob('testuser', 1);

    // Assertions: Verify the response
    expect(response).toEqual(mockResponse);
  });

  it('should get user info', async () => {
    // Mock the API response
    const mockUser = {
      user: {
        username: 'testuser',
        firstName: 'Test',
        lastName: 'User',
        email: 'test@example.com',
        isAdmin: false,
      },
    };
    mock.onGet('http://localhost:3001/users/testuser').reply(200, mockUser);

    // Make the API call
    const user = await JoblyApi.getUser('testuser');

    // Assertions: Verify the response
    expect(user.username).toBe('testuser');
    expect(user.firstName).toBe('Test');
    expect(user.lastName).toBe('User');
  });

  it('should update user profile', async () => {
    // Mock the API response
    const mockUpdatedUser = {
      user: {
        username: 'testuser',
        firstName: 'Updated',
        lastName: 'User',
        email: 'updated@example.com',
        isAdmin: false,
      },
    };
    mock.onPatch('http://localhost:3001/users/testuser').reply(200, mockUpdatedUser);

    // Make the API call
    const updatedUser = await JoblyApi.updateUser('testuser', { firstName: 'Updated' });

    // Assertions: Verify the response
    expect(updatedUser.firstName).toBe('Updated');
    expect(updatedUser.lastName).toBe('User');
  });
});
