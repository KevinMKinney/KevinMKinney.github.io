class RenderMesh {
    constructor( matrix, mesh ) {
        this.matrix = matrix;
        this.mesh = mesh;
    }
}

class RenderLight {
    constructor( location, color, num ) {
        this.loc = location;
        this.color = color;
        this.num = num;
    }
}

function generate_render_jobs(parent_matrix, node, jobs, lights) {
    let matrix = parent_matrix.mul(node.getMatrix());

    if (node.data instanceof Light) {
        let color = [node.data.r, node.data.g, node.data.b];
        lights.push( new RenderLight(matrix.get_transformed_coordinates(), color, node.data.light_no) );
    } else if (node.data instanceof FishMesh || node.data instanceof NormalMesh) {
        jobs.push( new RenderMesh(matrix, node.data) );
    }

    for (let child of node.children) {
        generate_render_jobs(matrix, child, jobs, lights);
    }
}