# Web Application with RESTful API and IaC Deployment Guide

This guide provides an overview and step-by-step instructions to deploy a web application with RESTful API endpoints using Node.js, Express, and MySQL. The deployment is done using Infrastructure as Code (IaC) principles on the AWS cloud platform. The project covers AWS setup, network configuration, continuous integration, continuous deployment, security groups, load balancer setup, autoscaling, DNS service, RDS configuration, S3 bucket setup, AMI creation, and logging/metrics implementation.

## AWS Setup

• Developed a web application using Node.js, Express, and MYSQL that provides RESTful API endpoints for performing CRUD 
operations on user and product data
• Used Terraform to provision AWS resources such as VPC, security groups, EC2, RDS, and S3 buckets
• Implemented CI/CD pipelines using GitHub Actions for automated testing and deployment 
• Created custom Linux AMIs using Packer for EC2 instances deployment
• Implemented a CloudWatch alarm that triggers the launch template for auto scaling and load balancing to initiate a new 
EC2 instance when the CPU utilization reaches 40 percent.
• Utilized Git and GitHub for efficient code collaboration, including creating and managing repositories
• Leveraged Git commands for branching, merging, and resolving conflicts, and utilizing GitHub features such as pull requests, 
code reviews, and continuous integration to ensure seamless code collaboration
this is the project overview and below are the detail of the project. Create a readme file using these details but in sequential manner. make sure to add all the important point
AWS Setup  

## Network Setup

1. Created a VPC (Virtual Private Cloud).
2. Configured an Internet Gateway for the VPC.
3. Established public and private subnets (three each in different availability zones).
4. Defined public and private route tables for the VPC.
5. Attached public subnets to the public route table.
6. Attached private subnets to the private route table.
7. Configured a public route in the public route table:
   - CIDR block: 0.0.0.0/0
   - Destination target: Internet Gateway

## Continuous Integration

1. Utilized GitHub Actions for continuous integration.
2. Configured workflows to run unit tests when a pull request is raised.
3. Implemented a workflow to validate Packer builds.
4. Enabled branch protection to ensure successful workflow execution before merging pull requests.
5. Triggered AMI builds upon successful merge, setting up the application.

## Continuous Deployment

1. Created a new template version using the newly built AMI.
2. Triggered an instance refresh command in the workflow to perform auto scaling group updates.

## Security Groups

1. Application Security Group:
   - Defined an ingress rule to allow TCP traffic on port 22 (SSH) and the application port (3000).
   - Restricted access to EC2 instances from the internet using the LoadBalancer Security Group as the source of traffic.
2. Load Balancer Security Group:
   - Defined an ingress rule to allow TCP traffic on port 443 (HTTPS).
3. Database Security Group:
   - Defined an ingress rule to allow TCP traffic on port 3306 (MySQL).
   - Restricted access to the RDS instance from the internet using the Application Security Group as the source of traffic.

## Load Balancer

1. Set up a load balancer to accept HTTPS traffic on port 443 and forward it to the application instances.
2. Attached the load balancer security group to the load balancer.
3. Imported an SSL certificate from ZeroSSL to AWS Certificate Manager.
4. Configured the load balancer listener with the imported SSL policy.

## Autoscaling

1. Created a launch template with EC2 instances configuration:
   - Defined user data to set up environment, enable application and CloudWatch to load on boot, and configure CloudWatch.
 
Visual Studio Code or any other IDE
POSTMAN
MySQL or any other database management system
Node.js
AWS account

Terraform...

Steps
Create a Node.js and MYSQL2 Webapp with RESTful APIs to perform CRUD operations on users and products.
Create a .sh file with the necessary dependencies, including Node.js and Mariadb. The commands in the .sh file should include unzipping the Webapp.zip file, installing nginx, and enabling and starting webapp and nginx services.

Configure your MySQL database and connect it to your Webapp.

Test your Webapp locally to make sure it is functioning correctly.
Create a Packer file to build the new AMI, including the source AMI to build from, a provisioner section to run the shell script file created in step 2, and a builders section to create the new AMI.
Run the Packer build command to create the new AMI.
Use Terraform to create a new EC2 instance from the AMI created in step 6.
Obtain the public IP address of the EC2 instance and test the APIs using POSTMAN.
After testing, create a pull request with a detailed description of changes.
Store the Image details in the RDS and meta data in S3 for future use.
API Endpoints
The Webapp includes the following endpoints for performing operations on users and products:

GET
POST
PUT
PATCH
DELETE.
HTTP messages that can be received include:

"200 OK"
"201 Created"
"204 No Content"
"400 Bad Request"
"401 Unauthenticated"
"403 Forbidden"
"500 Internal Server Error"
Conclusion
By following these steps, you can create an AMI for a Node.js and MYSQL2 Webapp and use it to run API tests with POSTMAN. With Terraform, you can easily create an EC2 instance from the AMI, and store the Image details in RDS and meta data in S3 for future use.

## Prerequisites

1.Visual studio code (IDE)
2.POSTMAN
3.Database - MySQL
4.Node.js
 #p1

## Dependencies to be installed 

- npm i 
- start app by npm start


<h4>Important Commands to run the server and test</h4>

## Scripts
- `npm start`: starts the development server
- `jest test`: runs test suite

## Endpoints
The following endpoints are available for operations: Change localhost to public ip adress of EC2

http://localhost:3000/v1/user, where you should see: "200 OK".

http://localhost:3000/v1/user/{id} where you should see: "201 Created".

http://localhost:3000/v1/user/self/ where you should see: "204 No Content".

http://localhost:3000/v1/user/self where you should use: "204 No Content".

http://localhost:3000/v1/product, where you should see: "200 OK".

http://localhost:3000/v1/product/{id} where you should see: "201 Created".

http://localhost:3000/v1/product/self/ where you should see: "204 No Content".

http://localhost:3000/v1/{product_id}/self where you should see "200 OK".

http://localhost:3000/v1/{product_id}/self where you should see "201 File Uploaded".

http://localhost:3000/v1/{product_id}/image/{image_id} where you should see "204 No Content"

http://localhost:3000/v1/{product_id}/image/{image_id}  where you should see "204 No Content"


## Responds with following HTTP messages

"200 OK - The request was successful."

"201 Created - A new resource was created as a result of the request, often sent in response to a POST or some PUT requests."

"204 No Content - The request was successful, but there's no need for the client to navigate away from its current page."

"400 Bad Request - The server could not process the request due to an invalid syntax."

"401 Unauthenticated - The client must provide authentication to receive the requested response."

"403 Forbidden - The client does not have access to the requested resource."

"500 Internal Server Error - The server encountered an issue it couldn't handle."


Instructions:

Step 1: Clone the repository or download and unzip the source repository.

Step 2: Create appropriate files in the IDE and write the code to test the API call in Postman.

Step 3: Open Postman to Test the API's

Step 4: Check the Database after each and every API is called to see the status in Database.

Please create a pull request with a detailed description of changes.
