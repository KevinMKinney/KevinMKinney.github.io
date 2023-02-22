class Node {
    constructor(data) {
        this.position = new Vec4(0,0,0,1);
        this.scale = new Vec4(1,1,1,1);
        this.roll = 0;
        this.pitch = 0;
        this.yaw = 0;
        this.data = data;
        this.children = [];
    }

    addChildNode(child) {
        this.children.push(child);
        return child;
    }

    addChildrenNodes(children) {
        for (let child of children) {
            this.children.push(child);
        }
    }

    getMatrix() {
        let matrix = new Mat4();
        matrix = matrix.mul( Mat4.translation(this.position.x, this.position.y, this.position.z) );
        matrix = matrix.mul( Mat4.rotation_xz(this.yaw) );
        matrix = matrix.mul( Mat4.rotation_yz(this.pitch) );
        matrix = matrix.mul( Mat4.rotation_xy(this.roll) );
        matrix = matrix.mul( Mat4.scale(this.scale.x, this.scale.y, this.scale.z) );
        return matrix;
    }
}

function orbiting_fish_builder(scale, orbit_turns, orbit_height, data, baby=false) {
    let fish_node = new Node(data);
    fish_node.scale = new Vec4(scale, scale, scale, 1);
    fish_node.yaw = -orbit_turns;
    if (!baby) {
        fish_node.position = new Vec4(Math.cos(orbit_turns * 2 * Math.PI), orbit_height, Math.sin(orbit_turns * 2 * Math.PI), 1);
    } else {
        fish_node.position = new Vec4(orbit_height, 0, 0, 1);
    }

    return fish_node;
}