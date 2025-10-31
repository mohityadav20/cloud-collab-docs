/**
 * Lambda function to resize uploaded images
 * Triggered by S3 object creation in uploads/images/ prefix
 * Creates thumbnails and stores them in thumbnails/ prefix
 */

const AWS = require('aws-sdk');
const sharp = require('sharp');

const s3 = new AWS.S3();
const THUMBNAIL_SIZE = 300; // Width in pixels
const THUMBNAIL_BUCKET = process.env.THUMBNAIL_BUCKET;
const THUMBNAIL_PREFIX = process.env.THUMBNAIL_PREFIX || 'thumbnails/';

/**
 * Main handler function
 * @param {Object} event - S3 event object
 * @param {Object} context - Lambda context
 */
exports.handler = async (event, context) => {
  console.log('Image resize function triggered:', JSON.stringify(event, null, 2));

  try {
    // Process each record in the S3 event
    for (const record of event.Records) {
      if (record.s3) {
        const bucket = record.s3.bucket.name;
        const key = decodeURIComponent(record.s3.object.key.replace(/\+/g, ' '));

        console.log(`Processing image: ${bucket}/${key}`);

        // Skip if already a thumbnail
        if (key.startsWith(THUMBNAIL_PREFIX)) {
          console.log('Skipping thumbnail file');
          continue;
        }

        // Get the image from S3
        const imageObject = await s3.getObject({ Bucket: bucket, Key: key }).promise();

        // Resize using Sharp
        const thumbnailBuffer = await sharp(imageObject.Body)
          .resize(THUMBNAIL_SIZE, null, {
            withoutEnlargement: true,
            fit: 'inside',
          })
          .jpeg({ quality: 80 })
          .toBuffer();

        // Generate thumbnail key
        const thumbnailKey = `${THUMBNAIL_PREFIX}${key.replace('uploads/images/', '')}`;

        // Upload thumbnail to S3
        await s3
          .putObject({
            Bucket: THUMBNAIL_BUCKET,
            Key: thumbnailKey,
            Body: thumbnailBuffer,
            ContentType: 'image/jpeg',
            CacheControl: 'max-age=31536000', // 1 year
          })
          .promise();

        console.log(`Thumbnail created: ${thumbnailKey}`);
      }
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Images processed successfully' }),
    };
  } catch (error) {
    console.error('Error processing images:', error);
    throw error;
  }
};

