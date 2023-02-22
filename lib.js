
 /**
  * Creates a new vertex buffer and loads it full of the given data.
  * Preserves bound buffer.
  *
  * @param {WebGLRenderingContext} gl
  * @param {number[]} data
  * @param {number} usage
  *
  * @returns {WebGlBuffer}
 */
function create_and_load_vertex_buffer(gl, data, usage) {
    let current_array_buf = gl.getParameter( gl.ARRAY_BUFFER_BINDING );

    let buf_id = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, buf_id );
    gl.bufferData( gl.ARRAY_BUFFER, new Float32Array(data), usage );

    gl.bindBuffer( gl.ARRAY_BUFFER, current_array_buf );

    return buf_id;
}

/**
 *
 * @param {WebGLRenderingContext} gl
 * @param {WebGLShader} shader_id
 */
function assert_shader_compiled_correctly( gl, shader_id ) {
    if( !gl.getShaderParameter( shader_id, gl.COMPILE_STATUS ) ) {
        let err = gl.getShaderInfoLog( shader_id );
        let shader_kind = gl.getShaderParameter( shader_id, gl.SHADER_TYPE );
        let shader_kind_name =
            shader_kind == gl.VERTEX_SHADER ? 'vertex shader' :
            shader_kind == gl.FRAGMENT_SHADER ? 'fragment shader' :
            'unknown shader';

        throw new Error( 'Compile error in ' + shader_kind_name + ':\n' + err );
    }

    return true;
}

/**
 * Creates a new shader program, creates and attaches vertex and fragment shaders
 * from the given sources, links the resulting program, and returns it.
 *
 * @param {WebGLRenderingContext} gl
 * @param {string} v_shader_src
 * @param {string} f_shader_src
 *
 * @returns {WebGLProgram}
 */
function create_compile_and_link_program( gl, v_shader_src, f_shader_src ) {
    let program = gl.createProgram()

    let v_shader = gl.createShader( gl.VERTEX_SHADER );
    gl.shaderSource( v_shader, v_shader_src );
    gl.compileShader( v_shader );
    assert_shader_compiled_correctly( gl, v_shader );

    let f_shader = gl.createShader( gl.FRAGMENT_SHADER );
    gl.shaderSource( f_shader, f_shader_src );
    gl.compileShader( f_shader );
    assert_shader_compiled_correctly( gl, f_shader );

    gl.attachShader( program, v_shader );
    gl.attachShader( program, f_shader );
    gl.linkProgram( program );

    if( !gl.getProgramParameter( program, gl.LINK_STATUS ) ) {
        let err = gl.getProgramInfoLog( program );
        throw new Error( 'Link error in shader program:\n' + err );
    }

    return program;
}

/**
 *
 * @param {WebGLRenderingContext} gl
 * @param {WebGLProgram} program
 */
function delete_program_and_attached_shaders( gl, program ) {
    let shaders = gl.getAttachedShaders( program );
    gl.deleteProgram( program );

    shaders.forEach( function( shader ) { gl.deleteShader( shader ); } );
}

/**
 * Sets the buffer for a given vertex attribute name.
 *
 * @param {WebGLRenderingContext} gl
 * @param {WebGLProgram} program
 * @param {string} attrib_name
 * @param {WebGLBuffer} buffer
 * @param {number} n_components
 * @param {number} gl_type
 * @param {number} stride
 * @param {number} offset
 */
function set_vertex_attrib_to_buffer(
    gl, program, attrib_name, buffer, n_components, gl_type, normalize, stride, offset )
{
    let attr_loc = gl.getAttribLocation( program, attrib_name );

    if ( attr_loc == - 1 ) {
        throw new Error( 'either no attribute named "' + attrib_name +
            '" in program or attribute name is reserved/built-in.' )
    }

    let err = gl.getError()
    if ( err != 0 ) {
        throw new Error( 'invalid program. Error: ' + err );
    }

    let current_array_buf = gl.getParameter( gl.ARRAY_BUFFER_BINDING );

    gl.bindBuffer( gl.ARRAY_BUFFER, buffer );
    gl.enableVertexAttribArray( attr_loc );
    gl.vertexAttribPointer( attr_loc, n_components, gl_type, normalize, stride, offset );
    //gl.enableVertexAttribArray( attr_loc );

    gl.bindBuffer( gl.ARRAY_BUFFER, current_array_buf );
}

/**
 * Set global parameters such as "clear color".
 * @param {WebGLRenderingContext} gl
 */
function set_render_params( gl ) {
    // gl.clearColor( 0.0, 0.0, 0.0, 1 );
    gl.clearColor( 0.5, 0.8, 1.0, 1.0 );

    gl.enable( gl.DEPTH_TEST );
    gl.enable( gl.BLEND );

    gl.depthMask( true );
    gl.depthFunc( gl.LEQUAL );

    gl.blendFunc( gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA );

    // gl.viewport( 0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight );
}

/**
 * Sets uniform data for a row-major matrix4
 *
 * @param {WebGLRenderingContext} gl
 * @param {WebGLProgram} program
 * @param {string} name
 * @param {number[]} data
 */
function set_uniform_matrix4( gl, program, name, data ) {
    //let old_prog = gl.getParameter( gl.CURRENT_PROGRAM );
    //gl.useProgram( program );

    const loc = gl.getUniformLocation( program, name );
    gl.uniformMatrix4fv( loc, true, data );

    //gl.useProgram( old_prog );
}

 /**
  * Creates a new index buffer and loads it full of the given data.
  * Preserves bound buffer.
  *
  * @param {WebGLRenderingContext} gl
  * @param {number[]} data
  * @param {number} usage
  *
  * @returns {WebGlBuffer}
 */
function create_and_load_elements_buffer(gl, data, usage) {
    let current_buf = gl.getParameter( gl.ELEMENT_ARRAY_BUFFER_BINDING );

    let buf_id = gl.createBuffer();
    gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, buf_id );
    gl.bufferData( gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(data), usage );

    gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, current_buf );

    return buf_id;
}


/**
 * Set the built-in shader uniform to texture unit 0.
 * (this isn't strictly necessary, but would if we wanted to use multi-texturing)
 * @param {WebGLRenderingContext} gl
 */
function bind_texture_samplers( gl, program, sampler_name ) {
    const old_prog = gl.getParameter( gl.CURRENT_PROGRAM );
    gl.useProgram( program );

    const loc = gl.getUniformLocation( program, sampler_name );
    gl.uniform1i( loc, 0 );

    gl.useProgram( old_prog );
}

/**
 * Sets uniform data for a 3 component vector.
 * @param {WebGLRenderingContext} gl
 * @param {WebGLProgram} program
 * @param {string} name
 */
function set_uniform_vec3( gl, program, name, x, y, z ) {
    // let old_prog = gl.getParameter( gl.CURRENT_PROGRAM );
    // gl.useProgram( program );

    const loc = gl.getUniformLocation( program, name );

    gl.uniform3f( loc, x, y, z );

    // gl.useProgram( old_prog );
}

/**
 * Set a single float value
 * @param {*} gl
 * @param {*} program
 * @param {*} name
 * @param {*} x
 */
function set_uniform_scalar( gl, program, name, x ){
    // let old_prog = gl.getParameter( gl.CURRENT_PROGRAM );
    // gl.useProgram( program );

    const loc = gl.getUniformLocation( program, name );
    gl.uniform1f( loc, x );

    // gl.useProgram( old_prog );
}

/**
 * Sets uniform data for an array of 3 component vectors.
 * @param {WebGLRenderingContext} gl
 * @param {WebGLProgram} program
 * @param {string} name
 * @param {number[]} data must be flattened
 */
function set_uniform_vec3_array( gl, program, name, data ) {
    // let old_prog = gl.getParameter( gl.CURRENT_PROGRAM );
    // gl.useProgram( program );

    const loc = gl.getUniformLocation( program, name );

    gl.uniform3fv( loc, data )

    // gl.useProgram( old_prog );
}

function set_uniform_int( gl, program, name, data ) {
    // let old_prog = gl.getParameter( gl.CURRENT_PROGRAM );
    // gl.useProgram( program );

    const loc = gl.getUniformLocation( program, name );

    gl.uniform1i( loc, data );

    // gl.useProgram( old_prog );
}

// code based off of "https://codepen.io/_bm/pen/EXEPpO"

//Returns fractional component
function fract(i) {
    return i - Math.floor(i);
}

//Linear interpolation
function lerp(v0, v1, t) {
    return (1 - t) * v0 + t * v1;
}

function hash3d(x, y, z) {
    x = 50 * fract(x * 0.3183099 + 0.71);
    y = 50 * fract(y * 0.3183099 + 0.113);
    z = 50 * fract(z * 0.3183099 + 0.33);
    return -1 + 2 * fract(1.375986 * seed + x * y * z * (x + y + z));
}

function noise3d(x, y, z) {
    let ix = Math.floor(x);
    let iy = Math.floor(y);
    let iz = Math.floor(z);
    let fx = fract(x);
    let fy = fract(y);
    let fz = fract(z);
    let ux = fx * fx * (3 - 2 * fx);
    let uy = fy * fy * (3 - 2 * fy);
    let uz = fz * fz * (3 - 2 * fz);
    return lerp(
        lerp(
            lerp(hash3d(ix + 0, iy + 0, iz + 0), hash3d(ix + 1, iy + 0, iz + 0), ux),
            lerp(hash3d(ix + 0, iy + 1, iz + 0), hash3d(ix + 1, iy + 1, iz + 0), ux),
        uy),
        lerp(
            lerp(hash3d(ix + 0, iy + 0, iz + 1), hash3d(ix + 1, iy + 0, iz + 1), ux),
            lerp(hash3d(ix + 0, iy + 1, iz + 1), hash3d(ix + 1, iy + 1, iz + 1), ux),
        uy),
        uz
    );
}

function fractal3d(x, y, z, octaves) {
    var val = 0;
    for (let i = 0; i < octaves; i++) {
        val += noise3d(x, y, z) / Math.pow(2, 0.5 + i - 0.5 * i);
        x -= i * 7;
        y += i * 13;
        z -= i * 23;
        x *= 1.4;
        y *= 1.4;
        z *= 1.4;
    }
    return val;
}
