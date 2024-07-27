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

data "aws_caller_identity" "current" {}

data "aws_region" "current" {}