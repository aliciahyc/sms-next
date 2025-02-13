# sms-next Web Application
Repo for the sms-next application.

## Dependencies
1. Node.js 

## Environments
1. Install Node.js https://nodejs.org/en/download
2. Run command to make sure node.js is installed and configured properly: node --version

## Download source code
Get source code from Github Repo: https://github.com/aliciahuang22/sms-next

## Download one of the package management tool:
npm
# or
yarn

## Building Application
1. Nevigate to project root directory: sms-next
2. Type command: 
npm run build
# or
yarn build
3. The build dirctory is at: sms-next/.next

## Running Application
1. Nevigate to project root directory: sms-next
2. Type command: 
npm run start
# or
yarn start
 
## Test Prerequisite
1. Backend app SmsControl is running
2. Send multiple requests to the SmsControl server. 
i.e. curl -X POST "http://localhost:5000/api/sms/allow-send" -H "Content-Type: application/json" -d '{"phoneNumber": "1234567890"}'

## Testing application on local
Open a browser, navigate to: http://localhost:3000/

## Test cases:
1. Click on button "Check SMS Process Rate".
Expected result: Get process rate for all the phone numbers from all time.

2. Enter a valid phone number, click on button "Check SMS Process Rate".
Expected result: Get process rate for this phone numbers from all time.

3. Enter a valid phone number, From Date and To Date, click on button "Check SMS Process Rate".
Expected result: Get process rate for this phone numbers from a time span.

4. Enter From Date and To Date withou a phone number, click on button "Check SMS Process Rate".
Expected result: Get process rate for all phones from a time span.

5. Enter an invalid phone number, click on button "Check SMS Process Rate".
Expected result: Get 0 process rate for all phones from a time span.

5. Enter a valid phone number, and invalid time span, click on button "Check SMS Process Rate".
Expected result: Get 0 process rate for all phones from a time span.
