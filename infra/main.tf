terraform {
  backend "s3" {
    bucket         = "886790807566-terraform-hackathon"
    key            = "github/vitor-avanco/hackathon"
    region         = "us-east-1"
  }
}

provider "aws" {
  region = var.aws_region
  default_tags {
    tags = {
      terraform = "true"
    }
  }
}

resource "aws_vpc" "fiapvpc" {
  cidr_block = "10.0.0.0/16"
  enable_dns_hostnames = true

  tags = {
    Name = "fiapvpc"
  }
}

resource "aws_subnet" "fiapvpc_private_subnets" {
  vpc_id     = aws_vpc.fiapvpc.id
  cidr_block = "10.0.1.0/24"

  tags = {
    Name = "fiapvpc_private_subnets"
  }
}

resource "aws_internet_gateway" "fiapvpc_igw" {
  vpc_id = aws_vpc.fiapvpc.id

  tags = {
    Name = "fiapvpc_igw"
  }
}

resource "aws_route_table" "fiapvpc_rt" {
  vpc_id = aws_vpc.fiapvpc.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.fiapvpc_igw.id
  }

  tags = {
    Name = "fiapvpc_rt"
  }
}

data "aws_caller_identity" "current" {}

data "aws_region" "current" {}