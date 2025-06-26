# Fe-Take-home-assessment
This is a web application that, when given battery JSON data with `academyId`, `batteryLevel`
`employeeId`,`serialNumber` and`timestamp` properties, identifies the schools with the highest number of battery issues and for each school, identifies which devices are unhealthy and in need of battery replacement


## Getting Started
* Click on the `Code` button.
* You can decide to download the zip file of the app onto the system or you can clone the repository from the terminal
* If you decide to clone the repository from the terminal, navigate to a directory of your choice on that terminal.
* Using SSH; copy and paste the following below on your terminal
```git@github.com:chinemelu/fe-take-home-assesment.git```
               OR
* Using HTTPS; copy and paste the following below on your terminal
>```https://github.com/chinemelu/fe-take-home-assesment.git```
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

### Dependencies
* [Vue3](https://vuejs.org/) - The Progressive JavaScript framework
* [TypeScript](https://www.typescriptlang.org/) - A superscript of JavaScript
* [Tailwind](https://tailwindcss.com/) - A utility-first CSS framework


## Author
Chinemelu Nwosu

