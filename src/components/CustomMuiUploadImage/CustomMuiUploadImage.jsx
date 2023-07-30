/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useRef, useState } from 'react';
import PropTypes from 'prop-types';

// * Material UI
import { Button } from '@mui/material';

const CustomMuiUploadImage = ({ url, saveCallback, cleanCallback }) => {
    const ref = useRef();
    const [hover, setHover] = useState(false);

    return (
        <div>
            {url == null ? (
                <>
                    <input
                        ref={ref}
                        type="file"
                        accept="image/*"
                        style={{ display: 'none' }}
                        onChange={() => {
                            const file = ref.current.files?.[0];
                            saveCallback(file);
                        }}
                    />
                    <Button onClick={() => ref.current && ref.current.click()} variant="contained">
                        Subir Imagen
                    </Button>
                </>
            ) : (
                <div
                    style={{
                        height: '100px',
                        width: '100px',
                        position: 'relative'
                    }}
                    onClick={() => {
                        cleanCallback();
                    }}
                >
                    <div
                        style={{
                            position: 'absolute',
                            top: '-2px',
                            bottom: '-2px',
                            left: '-2px',
                            right: '-2px',
                            margin: 'auto',
                            width: 'auto',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            textAlign: 'center'
                        }}
                        onMouseOver={(e) => {
                            e.target.style.background = 'rgba(0,0,0,0.3)';
                            setHover(true);
                        }}
                        onFocus={(e) => {
                            e.target.style.background = 'rgba(0,0,0,0.3)';
                            setHover(true);
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.background = 'rgba(255,255,255,0)';
                            setHover(false);
                        }}
                    >
                        {hover ? (
                            <div
                                style={{
                                    color: 'white',
                                    fontSize: '20px',
                                    cursor: 'pointer',
                                    padding: '10px',
                                    borderRadius: '20px'
                                }}
                            >
                                X
                            </div>
                        ) : null}
                    </div>
                    <img
                        src={url}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'contain'
                        }}
                        alt="imagen"
                    />
                </div>
            )}
        </div>
    );
};

CustomMuiUploadImage.propTypes = {
    url: PropTypes.string,
    saveCallback: PropTypes.func.isRequired,
    cleanCallback: PropTypes.func.isRequired
};

export default CustomMuiUploadImage;
