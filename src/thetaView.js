/**
 * Copyright (c) 2016 Ricoh Company, Ltd. All Rights Reserved.
 * Original : https://github.com/ricohapi/video-streaming-sample-app
 */

const THREE = require('three');

function createGeometry() {
    const geometry = new THREE.Geometry();

    const uvs = [];
    for (let j = 0; j <= 180; j += 5) {
        for (let i = 0; i <= 360; i += 5) {
            geometry.vertices.push(new THREE.Vector3(
                Math.sin(Math.PI * j / 180.0) * Math.sin(Math.PI * i / 180.0) * 500.0,
                Math.cos(Math.PI * j / 180.0) * 500.0,
                Math.sin(Math.PI * j / 180.0) * Math.cos(Math.PI * i / 180.0) * 500.0)
            );
        }
        /* devide texture */
        for (let k = 0; k <= 180; k += 5) {
          uvs.push(calcTexUv(k, j, 0));
        }
        for (let l = 180; l <= 360; l += 5) {
          uvs.push(calcTexUv(l, j, 1));
        }
    }
    for (let m = 0; m < 36; m++) {
        for (let n = 0; n < 72; n++) {
            const v = m * 73 + n;
            geometry.faces.push(
                new THREE.Face3(v + 0, v + 1, v + 73, null, null, 0),
                new THREE.Face3(v + 1, v + 74, v + 73, null, null, 0)
            );
            const t = (n < 36) ? m * 74 + n : m * 74 + n + 1;

            geometry.faceVertexUvs[0].push(
                [uvs[t + 0], uvs[t + 1], uvs[t + 74]], [uvs[t + 1], uvs[t + 75], uvs[t + 74]]
            );
        }
    }

    geometry.scale(-1, 1, 1); // rotate left-right
    return geometry;
}

function cyln2world(a, e) {
    return (new THREE.Vector3(
        Math.cos(e) * Math.cos(a),
        Math.cos(e) * Math.sin(a),
        Math.sin(e))
    );
}

function world2fish(x, y, z) {
    let nz = z;
    if (z < -1.0) nz = -1.0;
    else if (z > 1.0) nz = 1.0;

    return (new THREE.Vector2(
        Math.atan2(y, x),
        Math.acos(nz) / Math.PI)
    ); // 0.0 to 1.0
}

function calcTexUv(i, j, lens) {
    const world = cyln2world(
        ((i + 90) / 180.0 - 1.0) * Math.PI, // rotate 90 deg for polygon
        (0.5 - j / 180.0) * Math.PI
    );
    const ar = world2fish(
        Math.sin(-0.5 * Math.PI) * world.z + Math.cos(-0.5 * Math.PI) * world.x,
        world.y,
        Math.cos(-0.5 * Math.PI) * world.z - Math.sin(-0.5 * Math.PI) * world.x
    );

    const fishRad = 0.883;
    const fishRad2   = fishRad * 0.88888888888888;
    const fishCenter = 1.0 - 0.44444444444444;

    const x = (lens === 0) ?
        fishRad * ar.y * Math.cos(ar.x) * 0.5 + 0.25 :
        fishRad * (1.0 - ar.y) * Math.cos(-1.0 * ar.x + Math.PI) * 0.5 + 0.75;
    const y = (lens === 0) ?
        fishRad2 * ar.y * Math.sin(ar.x) + fishCenter :
        fishRad2 * (1.0 - ar.y) * Math.sin(-1.0 * ar.x + Math.PI) + fishCenter;

    return (new THREE.Vector2(x, y));
}

module.exports = { createGeometry };
