import React, { useState, useEffect, useRef } from 'react';
import { TextField, IconButton } from '@material-ui/core';
import { HiClipboardCopy } from 'react-icons/hi';
import styled from 'styled-components';

const CopyButton = styled(IconButton)`
    && {
        transform: translateX(-115%);
        padding: 5px;
        background: #5784f5;
        border-radius: 10px;
        cursor: pointer;
        color: white;

        &:active, &:hover {
            background: #809ce2 !important;
        }

        &:before {
            content: "Copied";
            position: absolute;
            top: -50px;
            left: -10px;
            background: #809ce2;
            padding: 8px 10px;
            border-radius: 20px;
            font-size: 10px;
            display: none;
        }

        &:after {
            content: "";
            position: absolute;
            top: -27.5px;
            left: 10px;
            width: 10px;
            height: 10px;
            background: #809ce2;
            transform: rotate(45deg);
            display: none;
        }

        &.active::after, &.active::before {
            display: block;
        }
    }
`
const Wrapper = styled.div`
    display: flex;
    align-items: center;
`
const ClipboardCopy = ({ copyText, className }) => {
    const [isCopied, setIsCopied] = useState(false);
 
    async function copyTextToClipboard(text) {
        if ('clipboard' in navigator) {
            return await navigator.clipboard.writeText(text);
        } else {
            return document.execCommand('copy', true, text);
        }
    }

    // onClick handler function for the copy button
    const handleCopyClick = () => {
        // Asynchronously call copyTextToClipboard
        copyTextToClipboard(copyText)
            .then(() => {
                // If successful, update the isCopied state value
                setIsCopied(true);
                setTimeout(() => {
                    setIsCopied(false);
                }, 1500);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <Wrapper className={className}>
            <TextField
                label="Room ID"
                variant="outlined"
                defaultValue={copyText}
                size="small"
                style={{ width: "300px"}}
                InputProps={{
                    readOnly: true,
                }}
            >
            </TextField>
            {/* Bind our handler function to the onClick button property */}
            <CopyButton onClick={handleCopyClick} className={isCopied && "active"}>
                <HiClipboardCopy style={{fontSize:"20px", color: "#fff"}}/>
            </CopyButton>
        </Wrapper>
    );
}

export default ClipboardCopy;