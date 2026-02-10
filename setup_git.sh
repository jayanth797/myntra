#!/bin/bash

# Navigate to project directory
cd /home/hero/Downloads/myntra-clone-main || exit

# Remove existing .git folder to start fresh
echo "Cleaning up old git configuration..."
rm -rf .git

# Initialize Git
echo "Initializing new Git repository..."
git init

# Add all files
echo "Adding files..."
git add .

# Initial commit
echo "Committing files..."
git commit -m "Initial commit for Vercel deployment"

# Rename branch to main
git branch -M main

# Add remote origin
echo "Adding remote origin..."
git remote add origin https://github.com/jayanth797/myntra.git

# Push to GitHub
echo "Pushing to GitHub..."
echo "If prompted for credentials, please enter your GitHub username and Personal Access Token."
git push -u origin main
