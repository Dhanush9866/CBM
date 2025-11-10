'use strict';

const axios = require('axios');
const { logger } = require('../setup/logger');
require('dotenv').config();

const LINKEDIN_API_URL = 'https://api.linkedin.com/v2/ugcPosts';
const LINKEDIN_ACCESS_TOKEN =  "AQWOHb9Wlz23vtYyjD88NPIOvFn728oqJ2vi6iVS17B4GngFGg1eQlzVwAUom27vbf7IH3heTbXVElvxS3W4uTu9V5Tvg-ZAvelufJ_VxBZriy1OrZ9_54YZe--oBDAcHqpK7UyNe7LPe8Lm1O6wlEqX4Rf_ixUtiJXub1TOEi_i18yCsdI6cZwYxuPIJe3kXTL43PN3O3jTQSz3CMlXsxuLAWvzDsSxd9TtHb5XQndOyxskDloWXM4RpgKoxOyGFzJsUjr7_akFAu6QftN7mqNsabM11LLfb0f-FHhReOfPxEr0_U-sQfnsk9-V42oJkjGdDWzynUNdgKYlA_OGSogzDjq_gw";
const LINKEDIN_MEMBER_URN =  "WHoSVMs2PH";

/**
 * Format LinkedIn post content for a job posting
 * @param {Object} job - Career/job object
 * @returns {string} Formatted post text
 */
function formatLinkedInPost(job) {
  // Support both applyLink and applicationUrl field names
  const applyLink = job.applyLink || job.applicationUrl || 'https://cbm360tiv.com/careers';
  
  return `📢 New Job Opening: ${job.title}
${job.description}
Apply here 👉 ${applyLink}`;
}

/**
 * Create a LinkedIn UGC post for a job opening
 * @param {Object} job - Career/job object with title, description, and applicationUrl
 * @returns {Promise<Object>} LinkedIn API response with post ID
 */
async function postJobToLinkedIn(job) {
  // Validate required environment variables
  if (!LINKEDIN_ACCESS_TOKEN) {
    throw new Error('LINKEDIN_ACCESS_TOKEN is not configured in environment variables');
  }

  if (!LINKEDIN_MEMBER_URN) {
    throw new Error('LINKEDIN_MEMBER_URN is not configured in environment variables');
  }

  // Validate job data
  if (!job || !job.title || !job.description) {
    throw new Error('Job title and description are required for LinkedIn posting');
  }

  const postText = formatLinkedInPost(job);

  // LinkedIn UGC Post payload structure
  const payload = {
    author: `urn:li:person:${LINKEDIN_MEMBER_URN}`,
    lifecycleState: 'PUBLISHED',
    specificContent: {
      'com.linkedin.ugc.ShareContent': {
        shareCommentary: {
          text: postText
        },
        shareMediaCategory: 'NONE'
      }
    },
    visibility: {
      'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC'
    }
  };

  try {
    logger.info('Posting job to LinkedIn', {
      jobTitle: job.title,
      memberUrn: LINKEDIN_MEMBER_URN
    });

    const response = await axios.post(LINKEDIN_API_URL, payload, {
      headers: {
        'Authorization': `Bearer ${LINKEDIN_ACCESS_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });

    // LinkedIn returns the post URN in the 'id' field of the response
    const postId = response.data.id || response.headers['x-linkedin-id'] || 'unknown';

    logger.info('Successfully posted job to LinkedIn', {
      jobTitle: job.title,
      linkedinPostId: postId
    });

    return {
      success: true,
      postId: postId,
      message: 'Job posted to LinkedIn successfully'
    };
  } catch (error) {
    // Log detailed error information
    const errorMessage = error.response?.data?.message || error.message || 'Unknown error';
    const errorStatus = error.response?.status || 'N/A';
    const errorData = error.response?.data || {};

    logger.error('Failed to post job to LinkedIn', {
      jobTitle: job.title,
      error: errorMessage,
      status: errorStatus,
      details: errorData
    });

    throw new Error(`LinkedIn API error: ${errorMessage} (Status: ${errorStatus})`);
  }
}

module.exports = {
  postJobToLinkedIn,
  formatLinkedInPost
};

