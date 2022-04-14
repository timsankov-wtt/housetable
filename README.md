### Installation

```bash
$ npm install
```

### Running the app

```bash
# development
$ npm run start
```

### DB setup

```bash
$ docker-compose up -d
```
# Endpoints 
1. Adding a new patient (patient details should contain a pet name, pet type (cat, dog, bird), owner name, and owner address, owner phone number).
> `POST /patient`

Example body:
```json 
{
    "name": "Alex",
    "address": "address 1",
    "type": "bird",
    "owner_name": "Bob",
    "owner_address": "address 1",
    "owner_phone_number": "+123123123412"
}
```
2. Getting a list of all patients in the hospital 
> `GET /patient`
3. Update patient details 
> `PUT /patient/:id`

Example body:
```json 
{
    "name": "Bob",
}
```
4. Delete patient details
> `DELETE /patient/:id`
5. Adding an appointment to an existing patient (appointment details should contain appointment start time, appointment end time, description, the fee paid by the USD or EUR or Bitcoin /unpaid and the amount).
> `POST /patient/:patientId/appointment`

Example body:
```json 
{
    "start": "2020-06-10T12:00:00.000Z",
    "end": "2020-06-10T16:00:00.000Z",
    "description": "desk...",
    "paid": false,
    "currency": "usd",
    "amount": 30
}
```
6. Get a list of all appointments for a specific patient. 
> `GET /patient/:id`
7. Update appointment details.
> `PUT /patient/:patientId/appointment/:id`

Example body:
```json 
{
    "paid": true,
}
```
8. Delete appointment details.
> `DELETE /patient/:patientId/appointment/:id`
9. Get a list of appointments for a specific day. 

[filter options](https://github.com/nestjsx/crud/wiki/Requests#filter-conditions)

> `GET /appointment/statistic?filter=start||$lte||2020-07-10T00:00:00.000Z&filter=start||$gte||2020-07-10T24:59:59.999Z`
10. Get a list of unpaid appointments.
> `GET /appointment/statistic?filter=paid||$eq||false`
11. Get a remaining bill for a specific patient.  
> `GET /appointment/statistic?filter=paid||$eq||true`
12. Get the weekly and monthly amount paid, unpaid and balance of hospital in dollars.

Month paid amount sum
> `GET /appointment/statistic/balance?filter=paid||$eq||false&filter=start||$gte||2020-06-01T00:00:00.000Z&filter=start||$lte||2020-06-31T23:59:59.999Z`
13. Get the most popular pet type, and how much money the hospital makes from each pet type.
> `GET /patient/trends`
> `GET /patient/sum`
