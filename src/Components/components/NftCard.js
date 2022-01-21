import React, { memo } from 'react';
import styled from "styled-components";
import {Link, useHistory} from "react-router-dom";
import { ethers } from "ethers";
import {toast} from "react-toastify";
import { faCheck, faCircle, faExternalLinkAlt, faLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import config from '../../Assets/networks/rpc_config.json';
import api from "../../core/api";
import LayeredIcon from "./LayeredIcon";
import {croSkullRedPotionImageHack} from "../../hacks";

const Outer = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  overflow: hidden;
  border-radius: 8px;
`;

//react functional component
const NftCard = ({
    nft,
    canTransfer = false,
    canSell = false,
    canCancel = false,
    canUpdate = false,
    onTransferButtonPressed,
    onSellButtonPressed,
    onCancelButtonPressed,
    onUpdateButtonPressed,
    newTab = false,
    imgClass = 'marketplace'
}) => {
    const history = useHistory();

    const navigateTo = (link) => {
        if (newTab) {
            window.open(link, "_blank");
        } else {
            history.push(link);
        }
    }

    const nftUrl = () => {
        // if (nft.listed) {
        //     return `/listing/${nft.listingId}`;
        // }

        return `/collection/${nft.address}/${nft.id}`;
    }

    const onCopyLinkButtonPressed = (url) => () =>{
        navigator.clipboard.writeText(url);
        toast.success('Copied!');
    }

    return (
        <div className="card eb-nft__card h-100 shadow">
            <img onClick={() => navigateTo(nftUrl())} src={croSkullRedPotionImageHack(nft.address, nft.image)} className="card-img-top marketplace"  style={{cursor:'pointer'}}/>
            {nft.rank &&
            <div className="badge bg-rarity text-wrap mt-1 mx-1">
                Rank: #{nft.rank}
            </div>
            }
            <div className="card-body d-flex flex-column">
                <div className="card-title mt-auto">
                    <span onClick={() => navigateTo(nftUrl())} style={{cursor:'pointer'}}>
                        {nft.count && nft.count > 0 ?
                            <h4>{nft.name} (x{nft.count})</h4>
                            :
                            <h4>{nft.name}</h4>
                        }
                    </span>
                </div>
                <p className="card-text">
                    {(nft.listed && nft.price)?
                        <>
                            {ethers.utils.commify(nft.price)} CRO
                        </>
                        :
                        <>
                            &nbsp;
                        </>
                    }
                </p>
            </div>
            <div className="card-footer d-flex justify-content-between">
                {canTransfer &&
                <span className="mx-1" onClick={onTransferButtonPressed} style={{cursor:'pointer'}}>Transfer</span>
                }
                {canSell &&
                <span className="mx-1" onClick={onSellButtonPressed} style={{cursor:'pointer'}}>Sell</span>
                }
                {canCancel &&
                <span className="mx-1" onClick={onCancelButtonPressed} style={{cursor:'pointer'}}>Cancel</span>
                }
                {canUpdate &&
                <span className="mx-1" onClick={onUpdateButtonPressed} style={{cursor:'pointer'}}>Update</span>
                }
                <span className="mx-1" onClick={onCopyLinkButtonPressed(new URL(nftUrl(), config.app_base))} style={{cursor:'pointer'}}>
                    <FontAwesomeIcon icon={faLink}/>
                </span>
            </div>
        </div>
    );
};

export default memo(NftCard);
