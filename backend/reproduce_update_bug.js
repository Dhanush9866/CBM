const axios = require('axios');

const API_URL = 'http://localhost:8020/api/careers';

async function verifyUpdate() {
    console.log('--- Starting Reproduction Script ---');
    let createdId = null;

    try {
        // 1. Create a Career
        const createPayload = {
            title: 'Test Career ' + Date.now(),
            department: 'Engineering',
            location: 'Remote',
            type: 'Full-time',
            level: 'Mid Level',
            description: 'Initial description',
            isActive: true,
            sections: [{ heading: 'Init Heading', content: 'Init Content' }]
        };

        console.log('1. Creating Career...');
        const createRes = await axios.post(API_URL, createPayload);
        if (!createRes.data.success) throw new Error('Create failed');
        createdId = createRes.data.data._id;
        console.log('   Created ID:', createdId);

        // 2. Update the Career (mimic Admin Panel)
        const updatePayload = {
            title: 'Updated Title',
            sections: [
                { heading: 'Updated Heading 1', content: 'Updated Content 1' },
                { heading: 'New Heading 2', content: 'New Content 2' }
            ]
        };

        console.log('2. Updating Career...');
        const updateRes = await axios.put(`${API_URL}/${createdId}`, updatePayload);
        console.log('   Update Response Success:', updateRes.data.success);
        console.log('   Update Response Message:', updateRes.data.message);

        // 3. Verify Updates
        console.log('3. Verifying Updates...');
        const getRes = await axios.get(`${API_URL}/${createdId}`);
        const fetched = getRes.data.data;

        console.log('   Fetched Title:', fetched.title);
        console.log('   Fetched Sections:', JSON.stringify(fetched.sections, null, 2));

        let failed = false;
        if (fetched.title !== 'Updated Title') {
            console.error('❌ Title update failed!');
            failed = true;
        }
        if (fetched.sections.length !== 2) {
            console.error('❌ Sections update failed! Count:', fetched.sections.length);
            failed = true;
        } else {
            if (fetched.sections[0].heading !== 'Updated Heading 1') {
                console.error('❌ Section 1 Heading mismatch!');
                failed = true;
            }
        }

        if (!failed) {
            console.log('✅ Update worked correctly according to basic fields.');
        } else {
            console.log('❌ Verify step failed.');
        }

    } catch (error) {
        console.error('❌ Error in script:', error.message);
        if (error.response) {
            console.error('   Response Status:', error.response.status);
            console.error('   Response Data:', error.response.data);
        }
    } finally {
        // Cleanup
        if (createdId) {
            console.log('4. Cleaning up...');
            await axios.delete(`${API_URL}/${createdId}`);
            console.log('   Deleted test career.');
        }
    }
    console.log('--- End Script ---');
}

verifyUpdate();
