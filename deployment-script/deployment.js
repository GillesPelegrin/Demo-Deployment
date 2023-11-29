import {$} from "zx";

import dev from './deployment-order/deployment-order-dev.json' assert { type: "json" };
import acc from './deployment-order/deployment-order-acc.json' assert { type: "json" };
import prd from './deployment-order/deployment-order-prd.json' assert { type: "json" };

let deploymentOrder;
if (process.argv[2] == null || process.argv[2] === "dev" ) {
    deploymentOrder = dev;
} else if (process.argv[2] === "acc") {
    deploymentOrder = acc;
}  else if (process.argv[2] === "prd") {
    deploymentOrder = prd;
}

for (const deploymentPath of deploymentOrder) {
    await applyManifest(deploymentPath)
}

async function getManifest(dirName) {
   return  await $`kubectl kustomize ../manifest/${dirName}`;
}

async function applyManifest(dirName) {
    return  await $`kubectl apply -k ../manifest/${dirName}`;
}