---
title: Deploying a Golang Server to EC2
date: 12/17/2017
---

### Setup and Initial Connection

The first step to deploying a server on an AWS EC2 instance is to choose an ["Amazon Machine Image" (AMI)](https://en.wikipedia.org/wiki/Amazon_Machine_Image) (a virtual machine). A new instance can be created through the AWS EC2 service at [https://console.aws.amazon.com/ec2](https://console.aws.amazon.com/ec2/), imaged below.

![AMI choice page](1.jpg)
*The AMI selection page*

The pem file at the end of the setup is *key* because you need it to login to the instance. The docs specify the following command for connecting to an EC2 instance remotely with the pem key as authentication:

```bash
ssh -i /path/my-key-pair.pem ec2-user@ec2-198-51-100-1.compute-1.amazonaws.com
```

From the line above, it's clear that the default username is ec2-user, while the public DNS can be found on the [AWS instance homepage](https://console.aws.amazon.com/ec2/). Mine is ec2-52-55-13-94.compute-1.amazonaws.com:

![Public DNS](2.jpg)

On first login, you'll get an "authenticity of host <PUBLIC_DNS(IPv4 Public IP)> can't be established", warning, which you should reply "yes" to.

### EC2 Login without PEM file

Since it can get annoying to reference the PEM file on every login, it's easiest at this point to copy your public key to the .ssh/authorized_keys file on the remote instance. If you don't have a public key, [read/do this](https://git-scm.com/book/en/v2/Git-on-the-Server-Generating-Your-SSH-Public-Key). This is doable by the following (with the correct substitutions to the PEM file name and public DNS):

```bash
ssh -i AWS-login.pem ec2-user@ec2-52-55-13-94.compute-1.amazonaws.com "echo \"`cat ~/.ssh/id_rsa.pub`\" >> .ssh/authorized_keys"
```

At this point it should be possible to login without a "-i [PEM FILE NAME]" flag.

### Adding a Port

Head now to security settings which is on the left side of EC2 management console (and beneath "NETWORK & SECURITY"). There, identify the security group used on the lazy deployed instance and, under the "Outbound" tab at the bottom of the page, add a Custom TCP Rule for Inbound and Outbound traffic on port 3000.

### Installing and Configuring Golang

The following lines are enough to install Golang (and git for the dependencies) on the remote server:

```bash
sudo yum update -y
sudo yum install -y git
sudo yum install -y golang
```

After that, add the GOROOT and GOPATH to ~/.bash_profile. Mine looks like this:

```bash
# .bash_profile

# Get the aliases and functions
if [ -f ~/.bashrc ]; then
        . ~/.bashrc
fi

# User specific environment and startup programs
GOROOT=/usr/lib/golang
GOPATH=$HOME/projects

PATH=$PATH:$HOME/.local/bin:$HOME/bin:$GOROOT/bin
```

### Moving Code to Server

I keep and develop my Golang code in a local repository within a "server" folder. The following is a bash script to clear the binaries I used during development and push the code to the instance, overwriting existing files (rsync is not available on the Windows as of last 2017):

```bash
rm server/*.exe
scp -r ./server ec2-user@ec2-52-55-13-94.compute-1.amazonaws.com:/home/ec2-user
```

After uploading the files to a server folder on the instance, the following will build and execute the Golang server:

```bash
go run `ls server/*.go | grep -v _test.go`
```

With that, the server should be available behind the DNS and port. For me, my Golang PDB comparison API is available at: "http://ec2-52-55-13-94.compute-1.amazonaws.com/:3000"