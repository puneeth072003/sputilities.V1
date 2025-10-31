#!/usr/bin/env node

/**
 * Sputilities API Endpoint Testing Script
 * 
 * This script tests the basic connectivity and structure of all API endpoints
 * to ensure they are properly configured and accessible.
 */

const axios = require('axios');

const BASE_URL = process.env.API_URL || 'http://localhost:3601/api/v1';

// Test configuration
const config = {
  timeout: 5000,
  validateStatus: function (status) {
    // Accept any status code for testing purposes
    return status >= 200 && status < 600;
  }
};

// Endpoint groups to test
const endpointGroups = {
  health: [
    { method: 'GET', path: '/health', description: 'Health check' }
  ],
  auth: [
    { method: 'GET', path: '/auth/login', description: 'Initiate login' },
    { method: 'GET', path: '/auth/check', description: 'Check auth status' }
  ],
  playlists: [
    { method: 'GET', path: '/playlists', description: 'Get playlists', requiresAuth: true }
  ],
  likedSongs: [
    { method: 'GET', path: '/liked-songs', description: 'Get liked songs', requiresAuth: true }
  ],
  operations: [
    { method: 'GET', path: '/operations', description: 'Get operations', requiresAuth: true }
  ],
  playlistManager: [
    { method: 'GET', path: '/playlist-manager/dashboard', description: 'Get dashboard', requiresAuth: true }
  ],
  tracks: [
    { method: 'GET', path: '/tracks/search?q=test', description: 'Search tracks', requiresAuth: true }
  ],
  smart: [
    { method: 'GET', path: '/smart/genres', description: 'Get genres', requiresAuth: true }
  ],
  users: [
    { method: 'GET', path: '/users/info', description: 'Get user info', requiresAuth: true }
  ],
  legacy: [
    { method: 'GET', path: '/legacy/check-login', description: 'Legacy auth check' },
    { method: 'GET', path: '/legacy/getUser', description: 'Legacy get user' }
  ]
};

// Colors for console output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

async function testEndpoint(endpoint) {
  const url = `${BASE_URL}${endpoint.path}`;
  
  try {
    const response = await axios({
      method: endpoint.method,
      url: url,
      ...config
    });

    const status = response.status;
    const statusColor = status < 300 ? 'green' : status < 400 ? 'yellow' : 'red';
    
    log(`  ${endpoint.method} ${endpoint.path}`, 'blue');
    log(`    Status: ${status} ${response.statusText}`, statusColor);
    log(`    Description: ${endpoint.description}`);
    
    if (endpoint.requiresAuth && status === 401) {
      log(`    ✓ Correctly requires authentication`, 'green');
    } else if (status < 300) {
      log(`    ✓ Endpoint accessible`, 'green');
    } else if (status >= 500) {
      log(`    ✗ Server error`, 'red');
    }
    
    return { success: status < 500, status, endpoint: endpoint.path };
  } catch (error) {
    log(`  ${endpoint.method} ${endpoint.path}`, 'blue');
    log(`    ✗ Connection failed: ${error.message}`, 'red');
    log(`    Description: ${endpoint.description}`);
    
    return { success: false, status: 'ERROR', endpoint: endpoint.path, error: error.message };
  }
}

async function testEndpointGroup(groupName, endpoints) {
  log(`\n${colors.bold}Testing ${groupName.toUpperCase()} endpoints:${colors.reset}`);
  
  const results = [];
  for (const endpoint of endpoints) {
    const result = await testEndpoint(endpoint);
    results.push(result);
    
    // Small delay between requests
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  
  return results;
}

async function runTests() {
  log(`${colors.bold}Sputilities API Endpoint Testing${colors.reset}`);
  log(`Base URL: ${BASE_URL}\n`);
  
  const allResults = [];
  
  for (const [groupName, endpoints] of Object.entries(endpointGroups)) {
    const results = await testEndpointGroup(groupName, endpoints);
    allResults.push(...results);
  }
  
  // Summary
  log(`\n${colors.bold}Test Summary:${colors.reset}`);
  const successful = allResults.filter(r => r.success).length;
  const total = allResults.length;
  
  log(`Total endpoints tested: ${total}`);
  log(`Successful: ${successful}`, successful === total ? 'green' : 'yellow');
  log(`Failed: ${total - successful}`, total - successful === 0 ? 'green' : 'red');
  
  if (total - successful > 0) {
    log(`\nFailed endpoints:`);
    allResults.filter(r => !r.success).forEach(r => {
      log(`  ${r.endpoint} - ${r.status} ${r.error || ''}`, 'red');
    });
  }
  
  log(`\n${colors.bold}Note:${colors.reset} Endpoints requiring authentication should return 401 when not authenticated.`);
  log(`This is expected behavior and indicates the endpoint is working correctly.`);
}

// Check if axios is available
try {
  require.resolve('axios');
} catch (e) {
  log('Error: axios is required to run this test script.', 'red');
  log('Install it with: npm install axios', 'yellow');
  process.exit(1);
}

// Run tests
if (require.main === module) {
  runTests().catch(error => {
    log(`Test runner error: ${error.message}`, 'red');
    process.exit(1);
  });
}

module.exports = { runTests, testEndpoint, testEndpointGroup };
