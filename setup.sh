#!/bin/bash

API_URL="http://localhost:5001/api"

echo "Creating permissions..."

manageBlocks=$(curl -s -X POST $API_URL/permissions \
-H "Content-Type: application/json" \
-d '{"name":"manageBlocks","description":"Can manage blocks"}')

manageSecurity=$(curl -s -X POST $API_URL/permissions \
-H "Content-Type: application/json" \
-d '{"name":"manageSecurity","description":"Can manage security"}')

inspectBlocks=$(curl -s -X POST $API_URL/permissions \
-H "Content-Type: application/json" \
-d '{"name":"inspectBlocks","description":"Can inspect blocks"}')

manageBlocksId=$(echo $manageBlocks | jq -r '._id')
manageSecurityId=$(echo $manageSecurity | jq -r '._id')
inspectBlocksId=$(echo $inspectBlocks | jq -r '._id')

echo "Permissions created:"
echo "manageBlocksId: $manageBlocksId"
echo "manageSecurityId: $manageSecurityId"
echo "inspectBlocksId: $inspectBlocksId"

echo "Creating roles..."

blockManager=$(curl -s -X POST $API_URL/roles \
-H "Content-Type: application/json" \
-d "{\"name\": \"block_manager\", \"permissions\": [\"$manageBlocksId\"]}")

securityManager=$(curl -s -X POST $API_URL/roles \
-H "Content-Type: application/json" \
-d "{\"name\": \"security_manager\", \"permissions\": [\"$manageSecurityId\"]}")

blockInspector=$(curl -s -X POST $API_URL/roles \
-H "Content-Type: application/json" \
-d "{\"name\": \"block_inspector\", \"permissions\": [\"$inspectBlocksId\"]}")

blockManagerId=$(echo $blockManager | jq -r '._id')
securityManagerId=$(echo $securityManager | jq -r '._id')
blockInspectorId=$(echo $blockInspector | jq -r '._id')

echo "Roles created:"
echo "blockManagerId: $blockManagerId"
echo "securityManagerId: $securityManagerId"
echo "blockInspectorId: $blockInspectorId"

echo "Creating users..."

curl -s -X POST $API_URL/users/register \
-H "Content-Type: application/json" \
-d "{\"username\": \"blockUser\", \"email\": \"block@example.com\", \"password\": \"password123\", \"roles\": [\"$blockManagerId\"]}" \
| jq

curl -s -X POST $API_URL/users/register \
-H "Content-Type: application/json" \
-d "{\"username\": \"securityUser\", \"email\": \"security@example.com\", \"password\": \"password123\", \"roles\": [\"$securityManagerId\"]}" \
| jq

curl -s -X POST $API_URL/users/register \
-H "Content-Type: application/json" \
-d "{\"username\": \"inspectorUser\", \"email\": \"inspector@example.com\", \"password\": \"password123\", \"roles\": [\"$blockInspectorId\"]}" \
| jq

echo "✅ All done!"
