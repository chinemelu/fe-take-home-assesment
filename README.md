# Fe-Take-home-assessment
This is a web application that, when given battery JSON data with `academyId`, `batteryLevel`
`employeeId`,`serialNumber` and`timestamp` properties, identifies the schools with the highest number of battery issues and for each school, identifies which devices are unhealthy and in need of battery replacement


## Getting Started Locally
* Click on the `Code` button.
* You can decide to download the zip file of the app onto the system or you can clone the repository from the terminal
* If you decide to clone the repository from the terminal, navigate to a directory of your choice on that terminal.
* Using SSH; copy and paste the following below on your terminal
```git@github.com:chinemelu/fe-take-home-assesment.git```
               OR
* Using HTTPS; copy and paste the following below on your terminal
```https://github.com/chinemelu/fe-take-home-assesment.git```
* cd into the `fe-take-home-assesment` folder
* Run `yarn dev` to start the development server
* Copy `http://localhost:5173/`, or any local server shown on the terminal, and paste it in the browser to see the application
* For the JSON data that will be uploaded on the application, ensure that it has the format

``` 
    {
        "data": [
            {
                "academyId": 30006,
                "batteryLevel": 0.68,
                "employeeId": "T1007384",
                "serialNumber": "1805C67HD02259",
                "timestamp": "2019-05-17T07:47:25.833+01:00"
            },
            {
                ....
            },
            {
                ....
            }
        ]
    }

```

## Running the tests
* The tests have been written using Vitest.
* cd into the folder
*  Write the following command on terminal.
* ```yarn install```
* Write the following command on terminal.
* ```yarn test```
* If the tests are successful, they will complete without failures or errors.
  ```
  .........
  ----------------------------------------------------------------------
    6 passed
  ```

### Dependencies
* [Vue3](https://vuejs.org/) - The Progressive JavaScript framework
* [TypeScript](https://www.typescriptlang.org/) - A superscript of JavaScript
* [Tailwind](https://tailwindcss.com/) - A utility-first CSS framework
* [Vitest](https://vitest.dev/) - Next Generation Testing Framework
* [Flowbite](https://flowbite.com/) - Open Source Library Built With utility classes in Tailwind CSS

### Architecture
* The folder structure of this application was done using the Feature Sliced Design ([FSD](https://feature-sliced.design/)) architecture for frontend development. The purpose of this was to make the application scale nicely with changing business requirements.
* Great care was taken to observe clean code principles to make the code maintainable. However, it must be noted that this was not always possible e.g the method for calculating percentages was especially long. In a real world application, this won't happen as efficient database queries will reduce the complexity of the calculations to be done, for example, by reducing or eliminating nested data structures, amongst other things.

### Methodology
* The goal was to calculate the percentage battery usage. However, when the battery percentage increases, the battery usage data is to be started again.
* I observed that there will be multiple sets of data and the best way to get a value will be to take an `average` of all the data. That is, for the period of 24 hours, any time I encoutnered a battery increase, I treated it as a different set of data until the next battery increase and then at the end, I took an average of all the different sets of data.
* The slight challenge with this methodology is that a user's battery may drain quickly due to many factors e.g the user is doing a compute intensive task as opposed to periods where the user may be idle or doing light tasks. This could lead to wild data swings and taking an average, albeit imperfect, is a way to factor this in. A big laptop battery usage above 30% may not mean the battery is bad due to the factors listed above, but it will be worth checking out from the data.

## Design
* The design was done with the users' experience in mind.
* The goal was to have a simple tab design with a file uploader and a table; the computation was moved to a web worker to avoid causing disruptions to the main thread and freezing the page.
* The file uploader was used to allow easy upload with JSON data. Given more time, an implementation allowing CSV file uploads would have been ideal.
* The table is a good way to present information, although a chart would have made for a better user experience for representing data showing the schools with the most defective devices.


## Author
Chinemelu Nwosu

