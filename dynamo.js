const AWS = require('aws-sdk');
const ObjectsToCsv = require('objects-to-csv');
require('dotenv').config();


AWS.config.update({
    region: process.env.AWS_DEFAULT_REGION,
});

const dynamoClient = new AWS.DynamoDB.DocumentClient();
const s3 = new AWS.S3();

const TABLE_NAME = "shopify-inventory";
const BUCKET = "shopify-inventory-bucket";

// get all the items in inventory
const getItems = async () => {
    const params = {
        TableName: TABLE_NAME
    };
    const items = await dynamoClient.scan(params).promise();
    return items.Items;
};

// add item or update item
const addOrUpdateCharacter = async (item) => {
    const params = {
        TableName: TABLE_NAME,
        Item: item
    };
    return await dynamoClient.put(params).promise();
};

// get specific item
const getItemById = async (id) => {
    const params = {
        TableName: TABLE_NAME,
        Key: {
            id,
        }
    };
    const item = await dynamoClient.get(params).promise();
    return [item.Item];
};

// delete specific item
const deleteId = async (id) => {
    const params = {
        TableName: TABLE_NAME,
        Key: {
            id,
        }
    };
    return await dynamoClient.delete(params).promise();
};

// get csv file of all the items in inventory
const csvAll = async () => {
    const allItems = await getItems();

    const csv = await new ObjectsToCsv(allItems).toString();

    const params = {
        Bucket: BUCKET,
        Key: "public/all.csv",
        Body: csv
    };

    const link = s3.upload(params).promise();
    return link;
};

// get csv of only one item
const csvId = async (id) => {
    const item = await getItemById(id);

    const csv = await new ObjectsToCsv(item).toString();

    const params = {
        Bucket: BUCKET,
        Key: `public/${ id }.csv`,
        Body: csv
    };

    const link = s3.upload(params).promise();
    return link;
};

module.exports = { getItems, addOrUpdateCharacter, getItemById, deleteId, csvAll, csvId };