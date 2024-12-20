const { test, expect } = require("@playwright/test");
const { Ajv } = require('ajv');

const ajv = new Ajv();

test('Tc1-Get', async ({ request }) => {
    const response = await request.get('https://reqres.in/api/users/2');
    expect(response.status()).toBe(200)

    const responseData = await response.json()

    expect(responseData.data.id).toBe(2)
    expect(responseData.data.email).toBe("janet.weaver@reqres.in")

    const valid = ajv.validate(require('./jsonSchemaTest/get_object_schema.json'), responseData)

    if (!valid){
        console.log("AJV Validation Errors:", ajv.errorsText());
    }

    expect(valid).toBe(true);
    
});

test('Tc2-Post', async ({ request }) => {
    const bodyData = {
        "name": "morpheus",
        "job": "leader"
    };

    const response = await request.post('https://reqres.in/api/users', {
        data: bodyData
    });

    expect(response.status()).toBe(201);

    const responseData = await response.json();
    console.log("Response Data:", responseData);

    expect(responseData.name).toBe("morpheus");
    expect(responseData.job).toBe("leader");
});

test('Tc3-Put', async ({ request }) => {
    const bodyData = {
        "name": "morpheus",
        "job": "zion resident"
    };

    const response = await request.put('https://reqres.in/api/users/2', {
        data: bodyData
    });

    expect(response.status()).toBe(200);

    const responseData = await response.json();
    console.log("Response Data:", responseData);

    expect(responseData.name).toBe("morpheus");
    expect(responseData.job).toBe("zion resident");
});

test('Tc4-Delete', async ({ request }) => {
    const response = await request.delete('https://reqres.in/api/users/2');

    expect(response.status()).toBe(204);

    console.log('Delete Response Status:', response.status());
});