// import { test, expect } from '@playwright/test'

// const users = {                               // Тест-данные (users / constants)
//     valid: {
//         username: 'standard_user',
//         password: 'secret_sauce'
//     },
//     invalid: {
//         username: 'bob',
//         password: '1234' 
//     },
//   empty: {
//     username: '',
//     password: ''
//   }
// };

// const errorMessage = '[data-test="error"]';

// async function login(page, username, password) {                        // переиспользование (reusability) убрали дублирование
//     await page.locator('[data-test="username"]').fill(username);
//     await page.locator('[data-test="password"]').fill(password);
//     await page.locator('#login-button').click();
// }
// test.describe('negative login tests', () => {              
                                                              //   Структурирование тестов describe + beforeEach
//     test.beforeEach( async ({ page }) => {
//     await page.goto('https://www.saucedemo.com/');  
//     });

//     test('empty login and pass', async ({ page }) => {
//     await login(page, users.empty.username, users.empty.password );
//     await expect(page.locator(errorMessage)).toContainText('Epic sadface: Username is required');
//     });

//     test('only username', async ({ page }) => {
//     await login(page, users.valid.username, users.empty.password);
//     await expect(page.locator(errorMessage)).toContainText('Epic sadface: Password is required');
//     });

//     test('only password', async ({ page }) => {
//     await login(page, users.empty.username, users.valid.password );
//     await expect(page.locator(errorMessage)).toContainText('Epic sadface: Username is required');
//     });

//     test('wrong password', async ({ page }) => {
//     await login(page, users.valid.username, users. invalid.password)
//     await expect(page.locator(errorMessage)).toContainText('Epic sadface: Username and password do not match any user in this service');
//     });

//     test('wrong username', async ({ page }) => {
//     await login(page, users.invalid.username, users.valid.password);
//     await expect(page.locator(errorMessage)).toContainText('Epic sadface: Username and password do not match any user in this service');

//     });
// });




                                                    

import { test, expect } from '@playwright/test'

test.describe('negative login tests', () => {       
    const testCases = [                            // Можно так как один тест оформить через параметризацию (Data-driven testing)
    {    
        name: 'empty login',
        username: '',
        password: '',
        error: 'Username is required'
    },
    {
        name: 'only username',
        username: 'standard_user',
        password: '',
        error: 'Password is required'
    },
    {
        name: 'only password',
        username: '',
        password: 'secret_sauce',
        error: 'Username is required'
    },
    {
        name: 'wrong password',
        username: 'standard_user',
        password: '1234',
        error: 'Username and password do not match any user in this service'
    },
    {
        name: 'wrong username',
        username: 'messi',
        password: 'secret_sauce',
        error: 'Username and password do not match any user in this service'
    }
    ];

    // const usernameInput = page.locator('[data-test="username"]');
    // const passwordInput = page.locator('[data-test="password"]');                 //добавить локаторы в переменные еще можно 
    // const loginButton = page.locator('#login-button');
    // const errorMessage = page.locator('[data-test="error"]');

    testCases.forEach(({name, username, password, error}) => {

        test(name, async ({ page }) => {
            await page.goto('https://www.saucedemo.com/');

            await page.locator('[data-test="username"]').fill(username);
            await page.locator('[data-test="password"]').fill(password);
            await page.locator('#login-button').click();

            await expect(page.locator('[data-test="error"]')).toContainText(error);
        })
    });
})


