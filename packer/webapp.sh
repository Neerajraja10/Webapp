#!/bin/bash

sudo yum update -y
sudo yum upgrade -y

sudo yum install -y gcc-c++ make
curl -sL https://rpm.nodesource.com/setup_16.x | sudo -E bash -
sudo yum install -y nodejs

#install cloud watch agent
sudo yum install amazon-cloudwatch-agent -y 

#start cloudwatch agent
sudo /opt/aws/amazon-cloudwatch-agent/bin/amazon-cloudwatch-agent-ctl \
-a fetch-config \
-m ec2 \
-c file:/home/ec2-user/Webapp/cloud-watch/configure.json \
-s

unzip webapp.zip -d webapp
cd /home/ec2-user/webapp
npm i

sudo cp ./packer/webapp.service /etc/systemd/system/