import React, { useState } from 'react';
import { TextField, IconButton } from '@material-ui/core';
import { HiClipboardCopy } from 'react-icons/hi';
import styled from 'styled-components';

const CopyButton = styled(IconButton)`
    transform: translateX(-110%);
    padding: 7px !important;

    &:active {

    }
    &:before {

    }
    &:after {

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
                style={{ width: "250px"}}
                InputProps={{
                    readOnly: true,
                }}
            >
            </TextField>
            {/* Bind our handler function to the onClick button property */}
            <CopyButton onClick={handleCopyClick}>
                <HiClipboardCopy style={{fontSize:"28px"}}/>
            </CopyButton>
        </Wrapper>
    );
}

export default ClipboardCopy;