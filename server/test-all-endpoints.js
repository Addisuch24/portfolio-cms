const http = require('http');

const BASE_URL = 'http://localhost:5000/api/public';

function testEndpoint(path, name) {
    return new Promise((resolve) => {
        http.get(`${BASE_URL}${path}`, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    const json = JSON.parse(data);
                    console.log(`✅ ${name}: SUCCESS`);
                    console.log(`   Status: ${res.statusCode}`);
                    console.log(`   Message: ${json.message}`);
                    
                    if (Array.isArray(json.data)) {
                        console.log(`   Records: ${json.data.length}`);
                    } else {
                        console.log(`   Data: ${json.data ? 'Available' : 'Empty'}`);
                    }
                    resolve();
                } catch (e) {
                    console.log(`❌ ${name}: Parse error - ${e.message}`);
                    resolve();
                }
            });
        }).on('error', (err) => {
            console.log(`❌ ${name}: ERROR - ${err.message}`);
            resolve();
        });
    });
}

async function testAllEndpoints() {
    console.log('🧪 Testing all public API endpoints...\n');

    await testEndpoint('/profile', 'Profile');
    console.log('');
    
    await testEndpoint('/skills', 'Skills');
    console.log('');
    
    await testEndpoint('/projects', 'Projects');
    console.log('');
    
    await testEndpoint('/experiences', 'Experiences');
    console.log('');
    
    await testEndpoint('/social-links', 'Social Links');
    console.log('');

    console.log('✅ All tests completed!');
}

testAllEndpoints();
